'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Users, Award, Trash2, Loader2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface UserData {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: string;
  createdAt: string;
  accounts: { provider: string }[];
  progress: {
    progressData: Record<string, unknown>;
    certificateName: string | null;
    certificateDate: string | null;
    updatedAt: string;
  } | null;
}

function getModulesCompleted(progressData: Record<string, unknown> | null): number {
  if (!progressData) return 0;
  const completed = progressData.completedModules;
  if (Array.isArray(completed)) return completed.length;
  return 0;
}

function getOverallProgress(progressData: Record<string, unknown> | null): number {
  if (!progressData) return 0;
  const progress = progressData.overallProgress;
  return typeof progress === 'number' ? Math.round(progress) : 0;
}

function getProvider(accounts: { provider: string }[]): string {
  if (accounts.length === 0) return 'Email';
  return accounts.map((a) => a.provider === 'google' ? 'Google' : a.provider).join(', ');
}

export function AdminDashboard() {
  const t = useTranslations('admin');
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/users/${deleteId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== deleteId));
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const totalUsers = users.length;
  const withCertificate = users.filter(
    (u) => u.progress?.certificateDate != null,
  ).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-8 animate-spin text-[#064E3B]" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="size-5 text-[#064E3B]" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#0D9488]">
            {t('title')}
          </span>
        </div>
        <h1 className="font-display text-3xl text-[#1A1A2E] sm:text-4xl">
          {t('title')}
        </h1>
        <p className="mt-2 text-[#1A1A2E]/50">{t('subtitle')}</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-8">
        <Card className="border border-[#E5E2DB] bg-white rounded-2xl shadow-none">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ECFDF5] border border-[#064E3B]/10">
              <Users className="size-5 text-[#064E3B]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1A1A2E]">{totalUsers}</p>
              <p className="text-sm text-[#1A1A2E]/50">{t('totalUsers')}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-[#E5E2DB] bg-white rounded-2xl shadow-none">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFFBEB] border border-[#D97706]/10">
              <Award className="size-5 text-[#D97706]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1A1A2E]">
                {withCertificate}
              </p>
              <p className="text-sm text-[#1A1A2E]/50">
                {t('withCertificate')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users table */}
      <Card className="border border-[#E5E2DB] bg-white rounded-2xl shadow-none overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-[#1A1A2E]">
            {t('users')}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {users.length === 0 ? (
            <p className="p-6 text-center text-[#1A1A2E]/40">{t('noUsers')}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E5E2DB] bg-[#FAF8F0]/50">
                    <th className="px-4 py-3 text-left font-medium text-[#1A1A2E]/60">
                      {t('name')}
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-[#1A1A2E]/60">
                      {t('email')}
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-[#1A1A2E]/60">
                      {t('provider')}
                    </th>
                    <th className="px-4 py-3 text-center font-medium text-[#1A1A2E]/60">
                      {t('modulesCompleted')}
                    </th>
                    <th className="px-4 py-3 text-center font-medium text-[#1A1A2E]/60">
                      {t('progress')}
                    </th>
                    <th className="px-4 py-3 text-center font-medium text-[#1A1A2E]/60">
                      {t('certificate')}
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-[#1A1A2E]/60">
                      {t('joined')}
                    </th>
                    <th className="px-4 py-3 text-center font-medium text-[#1A1A2E]/60">
                      {t('actions')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    const progressData = user.progress
                      ?.progressData as Record<string, unknown> | null;
                    const modulesCompleted = getModulesCompleted(progressData);
                    const overallProgress = getOverallProgress(progressData);
                    const hasCertificate = user.progress?.certificateDate != null;

                    return (
                      <tr
                        key={user.id}
                        className="border-b border-[#E5E2DB]/50 hover:bg-[#FAF8F0]/30 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {user.image ? (
                              <img
                                src={user.image}
                                alt=""
                                className="h-7 w-7 rounded-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#064E3B]/10 text-[#064E3B] text-xs font-semibold">
                                {(user.name?.[0] || user.email[0]).toUpperCase()}
                              </div>
                            )}
                            <span className="font-medium text-[#1A1A2E]">
                              {user.name || '—'}
                            </span>
                            {user.role === 'ADMIN' && (
                              <span className="inline-flex items-center rounded-full bg-[#064E3B]/10 px-2 py-0.5 text-[10px] font-semibold text-[#064E3B]">
                                ADMIN
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[#1A1A2E]/60">
                          {user.email}
                        </td>
                        <td className="px-4 py-3 text-[#1A1A2E]/60">
                          {getProvider(user.accounts)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="font-semibold text-[#1A1A2E]">
                            {modulesCompleted}
                          </span>
                          <span className="text-[#1A1A2E]/40">/10</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className="h-1.5 w-16 rounded-full bg-[#E5E2DB]">
                              <div
                                className="h-1.5 rounded-full bg-[#064E3B] transition-all"
                                style={{ width: `${overallProgress}%` }}
                              />
                            </div>
                            <span className="text-xs text-[#1A1A2E]/60">
                              {overallProgress}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {hasCertificate ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#ECFDF5] px-2.5 py-1 text-xs font-medium text-[#064E3B]">
                              <Award className="size-3" />
                              ✓
                            </span>
                          ) : (
                            <span className="text-[#1A1A2E]/30">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-[#1A1A2E]/50 text-xs">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {user.role !== 'ADMIN' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50"
                              onClick={() => setDeleteId(user.id)}
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('deleteUser')}</DialogTitle>
            <DialogDescription>{t('deleteConfirm')}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteId(null)}
              className="border-[#E5E2DB]"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting && <Loader2 className="size-4 mr-1 animate-spin" />}
              {t('deleteUser')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
