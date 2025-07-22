'use client'

import Button from "@/components/Button"
import { BeHttpClient } from "@/lib/HttpClient"
import { useEffect } from "react"

export default function LoginPage() {
  useEffect(() => {
    const f = async () => {
      BeHttpClient.post('/auth/signin', {
        email: 'test@gmail.com',
        password: 'somepass',
      });
    }
    f();
  }, [])
  return <div><Button></Button></div>
}