#!/usr/bin/env bash
# =============================================================================
# deploy-to-cloudrun.sh — Build and deploy this Next.js app to Google Cloud Run
# =============================================================================
#
# WHY: Sparring's production target is Cloud Run. This script wraps the
#      `gcloud run deploy --source` flow with the env vars from .env.local so
#      a redeploy is one command.
#
# COST: free tier covers low-traffic landing pages (~$0/month until ~2M
#       requests/month). Cloud Build free tier: first 120 build-minutes/day.
#
# USAGE:
#   ./scripts/deploy-to-cloudrun.sh [service-name] [region]
#
# DEFAULTS:
#   service-name = sparring-vc-coach
#   region       = us-central1
#
# PREREQUISITES (one-time setup, see GCP-DEPLOYMENT-GUIDE.md):
#   - gcloud CLI installed + authenticated (gcloud auth login)
#   - GCP project set (gcloud config set project <id>)
#   - APIs enabled: cloudbuild, run, artifactregistry
#   - .env.local contains ANTHROPIC_API_KEY + ANTHROPIC_MODEL
#
# NOTES:
#   - Reads .env.local for secrets but never echoes them
#   - Uses Cloud Build behind the scenes (build happens in GCP, not locally)
#   - .dockerignore must allow skills/*.md (chat API reads these at runtime)
# =============================================================================

set -euo pipefail

SERVICE_NAME="${1:-sparring-vc-coach}"
REGION="${2:-us-central1}"

cd "$(dirname "$0")/.."

# Verify .env.local exists
if [[ ! -f .env.local ]]; then
  echo "❌ .env.local not found. Create it with ANTHROPIC_API_KEY + ANTHROPIC_MODEL"
  exit 1
fi

# Load env vars without echoing them
set -a
source ./.env.local
set +a

if [[ -z "${ANTHROPIC_API_KEY:-}" ]]; then
  echo "❌ ANTHROPIC_API_KEY not set in .env.local"
  exit 1
fi

MODEL="${ANTHROPIC_MODEL:-claude-sonnet-4-5}"

# Verify gcloud auth + project
ACCOUNT=$(gcloud config get-value account 2>/dev/null || true)
PROJECT=$(gcloud config get-value project 2>/dev/null || true)

if [[ -z "$ACCOUNT" ]] || [[ -z "$PROJECT" ]]; then
  echo "❌ gcloud not configured. Run:"
  echo "    gcloud auth login"
  echo "    gcloud config set project <project-id>"
  exit 1
fi

echo "=========================================="
echo "Cloud Run deploy"
echo "  Service:  $SERVICE_NAME"
echo "  Region:   $REGION"
echo "  Project:  $PROJECT"
echo "  Account:  $ACCOUNT"
echo "  Model:    $MODEL"
echo "  Started:  $(date +%H:%M:%S)"
echo "=========================================="

gcloud run deploy "$SERVICE_NAME" \
  --source . \
  --region "$REGION" \
  --allow-unauthenticated \
  --memory 1Gi \
  --port 3000 \
  --set-env-vars "ANTHROPIC_MODEL=$MODEL,ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY"

echo ""
echo "✅ Deploy complete at $(date +%H:%M:%S)"
echo ""
echo "Service URL:"
gcloud run services describe "$SERVICE_NAME" --region "$REGION" --format='value(status.url)'
