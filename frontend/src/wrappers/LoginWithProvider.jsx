import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from '../Session/Login.jsx';

export default function LoginWithProvider() {
	return (
		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
			<Login />
		</GoogleOAuthProvider>
	);
}
