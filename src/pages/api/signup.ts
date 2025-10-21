import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    // Validate required fields
    if (!name || !email) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Name and email are required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Invalid email format' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get API key from environment variables
    const kitApiKey = import.meta.env.KIT_KEY;
    
    if (!kitApiKey) {
      console.error('KIT_KEY environment variable is not set');
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Server configuration error' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Prepare data for Kit.com V4 API
    const kitData = {
      email: email.trim(),
      first_name: name.trim(),
      // Add any additional fields that Kit.com V4 expects
      tags: ['wmg', 'whole-men-gathering', 'signup'],
      custom_fields: {
        source: 'wmg-website',
        form_type: 'community_signup',
        website: 'wmg.suuna.org',
        signup_date: new Date().toISOString()
      }
    };

    // Make request to Kit.com V4 API
    const kitResponse = await fetch('https://api.kit.com/v4/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${kitApiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(kitData)
    });

    if (!kitResponse.ok) {
      const errorText = await kitResponse.text();
      console.error('Kit.com API error:', kitResponse.status, errorText);
      
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Failed to process signup. Please try again.' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const kitResult = await kitResponse.json();
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Welcome to the gathering! You\'ll receive the live link and updates soon.',
      data: kitResult
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Signup API error:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Something went wrong. Please try again.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
