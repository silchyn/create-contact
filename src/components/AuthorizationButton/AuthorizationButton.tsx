'use client';

import { useIntegrationApp } from '@integration-app/react';
import { useCallback } from 'react';
import Button from '@/components/Button';

export default function AuthorizationButton() {
  const integrationApp = useIntegrationApp();

  const handleAuthorization = useCallback(async () => {
    await integrationApp.open();
    location.reload();
  }, [integrationApp]);

  return (
    <Button label="Authorize" type="button" onClick={handleAuthorization} />
  );
}
