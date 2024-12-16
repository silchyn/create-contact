'use client';

import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useState,
} from 'react';
import { useIntegrationApp } from '@integration-app/react';
import Button from '@/components/Button';

export default function Form() {
  const integrationApp = useIntegrationApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setName(event.target.value);
    setError('');
  }, []);

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setEmail(event.target.value);
    setError('');
  }, []);

  const handlePhoneChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setPhone(event.target.value);
    setError('');
  }, []);

  const handleCompanyChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setCompany(event.target.value);
    setError('');
  }, []);

  const handleSubmission: FormEventHandler<HTMLFormElement> = useCallback(async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const [pipedriveConnections, hubspotConnections] = await Promise.all([
        integrationApp.connections.find({
          integrationId: process.env.NEXT_PUBLIC_PIPEDRIVE_INTEGRATION_ID,
        }),
        integrationApp.connections.find({
          integrationId: process.env.NEXT_PUBLIC_HUBSPOT_INTEGRATION_ID,
        }),
      ]);

      const payload = {
        fullName: name.trim(),
        primaryEmail: email.trim(),
        primaryPhone: phone.trim(),
        companyName: company.trim(),
      };

      const actions = [];

      if (pipedriveConnections.items.length) {
        actions.push(integrationApp.connection('pipedrive').action('create-contact').run(payload));
      }

      if (hubspotConnections.items.length) {
        actions.push(integrationApp.connection('hubspot').action('create-contact').run(payload));
      }

      await Promise.all(actions);

      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [company, email, integrationApp, name, phone]);

  return (
    <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmission}>
      <label>
        <p className="mb-2 text-sm">Full name</p>

        <input
          type="text"
          required
          className="border border-solid border-neutral-500 transition-colors hover:border-white focus:border-white rounded-md bg-transparent px-4 py-2 w-full"
          placeholder="John Doe"
          value={name}
          onChange={handleNameChange}
          disabled={loading}
        />
      </label>

      <label>
        <p className="mb-2 text-sm">Email</p>

        <input
          type="email"
          required
          className="border border-solid border-neutral-500 transition-colors hover:border-white focus:border-white rounded-md bg-transparent px-4 py-2 w-full"
          placeholder="johndoe@gmail.com"
          value={email}
          onChange={handleEmailChange}
          disabled={loading}
        />
      </label>

      <label>
        <p className="mb-2 text-sm">Phone</p>

        <input
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          required
          className="border border-solid border-neutral-500 transition-colors hover:border-white focus:border-white rounded-md bg-transparent px-4 py-2 w-full"
          placeholder="123-456-7890"
          value={phone}
          onChange={handlePhoneChange}
          disabled={loading}
        />
      </label>

      <label>
        <p className="mb-2 text-sm">Company name</p>

        <input
          type="text"
          required
          className="border border-solid border-neutral-500 transition-colors hover:border-white focus:border-white rounded-md bg-transparent px-4 py-2 w-full"
          placeholder="JD corp."
          value={company}
          onChange={handleCompanyChange}
          disabled={loading}
        />
      </label>

      <Button
        label="Create"
        type="submit"
        className="mt-2"
        disabled={loading || Boolean(error)}
      />

      <p className="text-red-300">{error}</p>
    </form>
  );
}
