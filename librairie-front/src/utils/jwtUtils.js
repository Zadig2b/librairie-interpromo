// utils/jwtUtils.js

export function base64UrlDecode(base64Url) {
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) {
        base64 += '=';
    }
    return atob(base64);
}

export function decodeJwt(token) {
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('JWT does not have 3 parts');
    }
    
    // Decode the payload
    const payload = base64UrlDecode(parts[1]);
    return JSON.parse(payload);
}
