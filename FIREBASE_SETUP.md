# Firebase Setup Instructions for SikshaFlow

## Prerequisites
- A Google account
- Node.js and npm installed

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: `sikshaflow` (or your preferred name)
4. Click "Continue"
5. Disable Google Analytics (optional, but you can enable it later)
6. Click "Create project"
7. Wait for the project to be created, then click "Continue"

## Step 2: Enable Authentication

1. In the Firebase Console, click on "Authentication" in the left sidebar
2. Click "Get started"
3. Click on the "Sign-in method" tab
4. Enable "Email/Password" provider:
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

## Step 3: Register Your Web App

1. In the Firebase Console overview page, click the web icon (`</>`)
2. Enter app nickname: `sikshaflow-web`
3. Click "Register app"
4. You'll see your Firebase configuration object - **COPY THIS**
5. Click "Continue to console"

## Step 4: Get Your Firebase Configuration

Your configuration will look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Step 5: Add Configuration to Your Project

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_from_firebase
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

3. Save the file

## Step 6: Test Your Setup

1. Start your development server:
```bash
npm run dev
```

2. Navigate to `http://localhost:3000`
3. Click "Get Started" to go to the signup page
4. Try creating a new account with an email and password
5. You should be redirected to the subjects page after successful signup

## Step 7: Verify in Firebase Console

1. Go back to Firebase Console
2. Click on "Authentication" in the left sidebar
3. Click on the "Users" tab
4. You should see the user you just created!

## Features Implemented

✅ **Sign Up** - Create new accounts with email/password
✅ **Sign In** - Login with existing credentials  
✅ **Forgot Password** - Send password reset emails
✅ **Authentication State** - Persists login across page refreshes
✅ **Error Handling** - Shows user-friendly error messages

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure you've added all Firebase environment variables to `.env.local`
- Restart your dev server after adding environment variables

### "Firebase: Error (auth/invalid-api-key)"
- Double-check that your API key is correct in `.env.local`
- Make sure there are no extra spaces or quotes

### "Firebase: Error (auth/network-request-failed)"
- Check your internet connection
- Make sure Firebase services are not blocked by your firewall

### Email not receiving reset password link
- Check your spam folder
- In Firebase Console, go to Authentication > Templates to customize email templates
- Make sure your Firebase project billing is set up (required for sending emails)

## Security Notes

⚠️ **Important**: 
- Never commit your `.env.local` file to version control
- The `.env.local` file is already in `.gitignore`
- For production, set environment variables in your hosting platform (Vercel, Netlify, etc.)

## Next Steps

- Set up Firestore for storing user data
- Add profile management
- Implement email verification
- Add social authentication (Google, GitHub, etc.)
- Set up Firebase security rules

For more information, visit the [Firebase Documentation](https://firebase.google.com/docs)
