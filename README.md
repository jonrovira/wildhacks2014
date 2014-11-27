wildhacks2014
=============

Holds the work Nevil George and I did during WildHacks 2014 at Northwestern University

Authentication
===============

Our REST API is properly secured in the backend, so to send any HTTP request, you need to have a user token in the header of your request.
However, since this is a SPA, all pages are loaded with one request when the page is first loaded. Hence, loading specific pages in our web app doesn't require authentication and we need to fix that.