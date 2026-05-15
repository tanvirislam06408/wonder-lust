# Secure API Request with Better Auth JWT

This guide explains how to securely send a session token from your Next.js server to your backend API using **Better Auth JWT** authentication.

---

# 1. Enable JWT Cookie Cache in `auth.js`

First, enable JWT session caching so the token can be stored in cookies.

```js
import { betterAuth } from "better-auth"
import { jwt } from "better-auth/plugins"

export const auth = betterAuth({
    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",

            // 7 days
            maxAge: 7 * 24 * 60 * 60
        }
    },

    plugins: [
        jwt()
    ]
})
```

### What this does

* Stores the session token in cookies
* Uses JWT strategy
* Keeps users logged in for 7 days

---

# 2. Configure `auth-client.js`

Now enable JWT support in the client.

```js
import { createAuthClient } from "better-auth/react"
import { jwtClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        jwtClient()
    ]
})
```

### Important

Do not forget to import:

```js
import { jwtClient } from "better-auth/client/plugins"
```

---

# 3. Get Session Token in Server Component

Now you can access the token from the server and send it to your backend API.

```js
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export const getDataById = async (id) => {

    // Get JWT token
    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    // Send token to backend server
    const res = await fetch(
        `http://localhost:5000/destinations/${id}`,
        {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    )

    const data = await res.json()

    return data
}
```

---

You can add this section after the **Server Component Token** section in your README.

---

# 3.1 Get Session Token in Client Component

You can also get the JWT token inside a Client Component using `authClient`.

```js id="0q8mde"
"use client"

import { authClient } from "@/lib/auth-client"

const getToken = async () => {

    // Get JWT token
    const tokenData = await authClient.getToken()

    console.log(tokenData)

    const token = tokenData?.data?.token

    // Send token to backend
    const res = await fetch("http://localhost:5000/protected-route", {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    const data = await res.json()

    console.log(data)
}

export default function ExampleComponent() {

    return (
        <button onClick={getToken}>
            Get Protected Data
        </button>
    )
}
```

---

# How It Works

1. `authClient.getToken()` gets the JWT token from Better Auth
2. The token is extracted from the response
3. The token is sent in the `Authorization` header
4. Backend verifies the token using middleware
5. If the token is valid, the API request succeeds

---

# Example Response from `getToken()`

```js id="eb4hko"
{
    data: {
        token: "your-jwt-token"
    }
}
```

---

# Authorization Header Format

```js id="zst4tm"
headers: {
    authorization: `Bearer ${token}`
}
```

This is the standard format for sending JWT tokens in authenticated API requests.


# 4. Create JWT Verification Middleware in Backend

Now verify the token in your backend server.

```js
import { createRemoteJWKSet, jwtVerify } from "jose"

const JWKS = createRemoteJWKSet(
    new URL("http://localhost:3000/api/auth/jwks")
)

const verifyToken = async (req, res, next) => {

    // Get authorization header
    const tokenHeader = req.headers.authorization

    // Check if header exists
    if (!tokenHeader) {
        return res.status(401).send({
            message: "Unauthorized"
        })
    }

    // Extract token from Bearer token
    const token = tokenHeader.split(" ")[1]

    // Check if token exists
    if (!token) {
        return res.status(401).send({
            message: "Unauthorized"
        })
    }

    try {

        // Verify JWT token
        const { payload } = await jwtVerify(token, JWKS)

        console.log(payload)

        next()

    } catch (error) {

        return res.status(403).send({
            message: "Forbidden"
        })
    }
}

export default verifyToken
```

---

# 5. Why `createRemoteJWKSet()` is Needed

```js
const JWKS = createRemoteJWKSet(
    new URL("http://localhost:3000/api/auth/jwks")
)
```

Better Auth signs JWT tokens using cryptographic keys.

Your backend server needs the public key to verify whether the token is valid or not.

`createRemoteJWKSet()` fetches that public key from:

```txt
/api/auth/jwks
```

Without this, `jwtVerify()` cannot verify the token signature.

---

# 6. Use the Middleware in Protected Routes

Now protect your API routes using the middleware.

```js
app.get("/destinations/:id", verifyToken, async (req, res) => {

    const id = req.params.id

    // Protected logic here

    res.send({
        success: true
    })
})
```

---

# Authentication Flow

1. User logs in
2. Better Auth creates JWT token
3. Token is stored in cookies
4. Server component gets token using `auth.api.getToken()`
5. Token is sent in request headers
6. Backend verifies token using `jwtVerify()`
7. If valid → access granted
8. If invalid → request blocked

---

# Required Packages

Install `jose` in your backend server:

```bash
npm install jose
```

---

# Example Authorization Header

```js
headers: {
    authorization: `Bearer ${token}`
}
```

This is the standard way to send JWT tokens in secure API requests.
