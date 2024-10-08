"use client";

import React, { useState, useEffect, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle2, XCircle, Shield, ShieldOff, Mail, Lock, Eye, EyeOff, Loader2, Info } from "lucide-react";

type GuardAction = 'enable' | 'disable';

interface FbGuardProps {
  initialAction?: GuardAction;
}

export const FbGuard: React.FC<FbGuardProps> = ({ initialAction = 'enable' }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [action, setAction] = useState<GuardAction>(initialAction);
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('Processing...');
    setResult(null);

    try {
      const token = await generateToken(email, password);
      if (token) {
        await updateGuard(token.accessToken, token.uid, action === 'enable');
        setResult({
          success: true,
          message: `Facebook Picture Guard has been ${action}d successfully.`,
        });
        if (rememberMe) {
          localStorage.setItem('fbGuardEmail', email);
        } else {
          localStorage.removeItem('fbGuardEmail');
        }
      }
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setIsLoading(false);
      setStatus(null);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleAction = () => {
    setAction(action === 'enable' ? 'disable' : 'enable');
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('fbGuardEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          {action === 'enable' ? <Shield className="h-6 w-6" /> : <ShieldOff className="h-6 w-6" />}
          Facebook Picture Guard {action === 'enable' ? 'Enabler' : 'Disabler'}
        </CardTitle>
        <CardDescription className="text-base">
          {action === 'enable' ? 'Turn on' : 'Turn off'} your Facebook Picture Guard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email or Phone Number</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                placeholder="Enter your email or phone"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                placeholder="Enter your password"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="remember-me"
                checked={rememberMe}
                onCheckedChange={setRememberMe}
              />
              <Label htmlFor="remember-me">Remember me</Label>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle between Enable and Disable mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="action-toggle"
              checked={action === 'enable'}
              onCheckedChange={toggleAction}
            />
            <Label htmlFor="action-toggle">{action === 'enable' ? 'Enable' : 'Disable'} Guard</Label>
          </div>
          <Button type="submit" className="w-full font-semibold" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {action === 'enable' ? <Shield className="mr-2 h-5 w-5" /> : <ShieldOff className="mr-2 h-5 w-5" />}
                {action === 'enable' ? 'Enable' : 'Disable'} Guard
              </>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-2">
        {status && <p className="text-sm text-muted-foreground">{status}</p>}
        {result?.message && (
          <Alert variant={result.success ? "default" : "destructive"} className="w-full">
            {result.success ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            <AlertTitle>{result.success ? "Success" : "Error"}</AlertTitle>
            <AlertDescription>{result.message}</AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
};

async function generateToken(user: string, pwd: string): Promise<{ accessToken: string; uid: string } | null> {
  try {
    const response = await fetch(
      `https://b-api.facebook.com/method/auth.login?access_token=237759909591655%25257C0f140aabedfb65ac27a739ed1a2263b1&format=json&sdk_version=2&email=${encodeURIComponent(user)}&locale=en_US&password=${encodeURIComponent(pwd)}&sdk=ios&generate_session_cookies=1&sig=3f555f99fb61fcd7aa0c44f58f522ef6`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if ('error_msg' in data) {
      throw new Error(data.error_msg);
    }

    return {
      accessToken: data.access_token,
      uid: data.uid,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

async function updateGuard(token: string, uid: string, enable: boolean): Promise<void> {
  try {
    const url = `https://graph.facebook.com/v16.0/${uid}/picture_guard`;
    const response = await fetch(url, {
      method: enable ? "POST" : "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to update Picture Guard: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
