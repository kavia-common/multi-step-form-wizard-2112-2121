import React from 'react';
import Card from './common/Card';

/**
 * PUBLIC_INTERFACE
 */
export default function SuccessScreen({ username, avatarPreview }) {
  /**
   * Minimal success screen: Only shows success icon, "Profile created" heading,
   * and the uploaded photo. No buttons or extra prompts.
   */
  return (
    <Card className="w-full max-w-xl mx-auto p-6 md:p-8">
      <div className="text-center space-y-4">
        <div className="mx-auto w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M20 7L9 18l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 className="text-2xl font-semibold text-text">Profile created</h1>

        <div className="flex items-center justify-center">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Uploaded avatar"
              className="h-24 w-24 rounded-xl object-cover border border-gray-200"
            />
          ) : (
            <div className="h-24 w-24 rounded-xl bg-gray-50 border border-gray-200 grid place-items-center text-gray-400 text-xs">
              No image
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
