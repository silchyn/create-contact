'use client';

import { IntegrationAppProvider } from '@integration-app/react';
import AuthorizationButton from '@/components/AuthorizationButton';
import Form from '@/components/Form';

export default function App() {
  return (
    <IntegrationAppProvider
      token={process.env.NEXT_PUBLIC_INTEGRATION_APP_TOKEN}
    >
      <div
        className="bg-neutral-900 max-w-lg mx-auto px-8 py-4 rounded-b-xl"
      >
        <AuthorizationButton />
        <Form />
      </div>
    </IntegrationAppProvider>
  );
}
