import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { type UserRole } from '../../types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, selectedRole, setScreen } = useAuth();

  if (!isAuthenticated) {
    setScreen('login');
    return null;
  }

  if (allowedRoles && !allowedRoles.includes(selectedRole)) {
    return (
      <div className="p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-rose-500">Access Denied (403)</h2>
        <p className="text-xs font-mono text-slate-300">
          Your current role (<strong>{selectedRole}</strong>) does not have authorization to view this enterprise module.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};
