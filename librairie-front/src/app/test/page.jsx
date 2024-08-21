import { useAuth } from '../../context/AuthContext';

export default function TestComponent() {
    const { user, logout } = useAuth();
    return <div>{user ? `Logged in as ${user.name}` : 'Not logged in'}</div>;
}
