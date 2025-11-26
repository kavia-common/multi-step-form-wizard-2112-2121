#!/bin/bash
cd /home/kavia/workspace/code-generation/multi-step-form-wizard-2112-2121/frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

