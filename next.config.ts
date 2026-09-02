import type { NextConfig } from "next";

const securityHeaders=[
  {key:"X-Content-Type-Options",value:"nosniff"},
  {key:"X-Frame-Options",value:"SAMEORIGIN"},
  {key:"Referrer-Policy",value:"strict-origin-when-cross-origin"},
  {key:"Permissions-Policy",value:"camera=(), microphone=(), geolocation=()"},
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers(){
    return [{source:"/(.*)",headers:securityHeaders}];
  },
  async redirects(){
    return [
      {source:"/:path*",has:[{type:"host",value:"olbarun.kr"}],destination:"https://5km.kr/:path*",permanent:true},
      {source:"/:path*",has:[{type:"host",value:"www.olbarun.kr"}],destination:"https://5km.kr/:path*",permanent:true},
    ];
  },
};

export default nextConfig;
