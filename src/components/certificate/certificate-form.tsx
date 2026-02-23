'use client';

import { useState } from 'react';
import { User, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLearningStore } from '@/store/learning-store';

interface CertificateFormProps {
  onPreview: () => void;
}

export function CertificateForm({ onPreview }: CertificateFormProps) {
  const certificateName = useLearningStore((s) => s.certificateName);
  const setCertificateName = useLearningStore((s) => s.setCertificateName);
  const [name, setName] = useState(certificateName || '');

  const handlePreview = () => {
    if (name.trim()) {
      setCertificateName(name.trim());
      onPreview();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && name.trim()) {
      handlePreview();
    }
  };

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#2E7D32]/10">
          <User className="size-6 text-[#2E7D32]" />
        </div>
        <CardTitle className="text-xl font-display">Enter Your Name</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="certificateName">Full Name (as it will appear on the certificate)</Label>
          <Input
            id="certificateName"
            placeholder="e.g. Maria Kowalska"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
        <Button
          onClick={handlePreview}
          disabled={!name.trim()}
          className="w-full bg-[#2E7D32] hover:bg-[#1B5E20]"
        >
          <Eye className="size-4 mr-1" />
          Preview Certificate
        </Button>
      </CardContent>
    </Card>
  );
}
