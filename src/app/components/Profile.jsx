import useUsers from '../hooks/customers_hook';
import useAuth from '../hooks/admin_auth';
import useAdminDetails from '../hooks/admin_details';

export default function Profile() {
  const { count, users } = useUsers();
  const { user } = useAuth();
  const { adminDetails, loading, error } = useAdminDetails();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-600">
            Manage your profile and statistics
          </p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-blue-50 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-medium text-blue-700">Available Users</h3>
          <p className="mt-2 text-3xl font-bold text-blue-900">{count}</p>
        </div>
        <div className="p-6 bg-green-50 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-medium text-green-700">Deliveries</h3>
          <p className="mt-2 text-3xl font-bold text-green-900">75</p>
        </div>
        <div className="p-6 bg-yellow-50 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-medium text-yellow-700">Booked Rooms</h3>
          <p className="mt-2 text-3xl font-bold text-yellow-900">{users.length}</p>
        </div>
      </div>

      <div className="flex items-center space-x-6 mb-10">
        <div className="flex-shrink-0">
          <img
            className="h-24 w-24 rounded-full object-cover shadow-md"
            src={adminDetails?.img_url}
            alt="Profile"
          />
        </div>
        
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{adminDetails?.name}</h1>
          <p className="text-gray-600">Admin</p>
          <p className="text-gray-600">{adminDetails?.email}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Profile Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={adminDetails?.name || ''}
              readOnly
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={adminDetails?.email || ''}
              readOnly
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <input
              type="text"
              value="Admin"
              readOnly
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
