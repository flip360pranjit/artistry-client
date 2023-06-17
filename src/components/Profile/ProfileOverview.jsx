import React from "react";

function ProfileOverview() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Buyer Profile Dashboard</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 lg:col-span-1 mb-8">
          <h3 className="text-xl font-semibold mb-4">Dashboard Overview</h3>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Order History</h4>
            <p className="mb-2">
              View a list of past orders, including order details, status, and
              tracking information.
            </p>
          </div>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Wishlist</h4>
            <p className="mb-2">
              Manage and view items saved for future purchase.
            </p>
          </div>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Notifications</h4>
            <p className="mb-2">
              Receive updates on order status, promotions, and new arrivals.
            </p>
          </div>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Account Settings</h4>
            <p className="mb-2">
              Update personal information, address, and communication
              preferences.
            </p>
          </div>
        </div>
        <div className="col-span-2 lg:col-span-1 mb-8">
          <h3 className="text-xl font-semibold mb-4">My Orders</h3>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Current Orders</h4>
            <p className="mb-2">
              Track the status of ongoing orders, including estimated delivery
              dates and shipment details.
            </p>
          </div>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Order History</h4>
            <p className="mb-2">
              Access a detailed record of past orders, including order dates,
              items, and order totals.
            </p>
          </div>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Returns and Refunds</h4>
            <p className="mb-2">
              Initiate return requests and check the status of return or refund
              processes.
            </p>
          </div>
        </div>
        <div className="col-span-2 lg:col-span-1 mb-8">
          <h3 className="text-xl font-semibold mb-4">My Wishlist</h3>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Saved Items</h4>
            <p className="mb-2">
              Browse and manage a list of products saved for future purchase.
            </p>
          </div>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Add to Cart</h4>
            <p className="mb-2">
              Easily move wishlist items to the shopping cart for checkout.
            </p>
          </div>
        </div>
        <div className="col-span-2 lg:col-span-1 mb-8">
          <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Personal Information</h4>
            <p className="mb-2">
              Update name, email address, phone number, and profile picture.
            </p>
          </div>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Address Book</h4>
            <p className="mb-2">
              Manage saved shipping addresses for faster checkout.
            </p>
          </div>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">
              Communication Preferences
            </h4>
            <p className="mb-2">
              Set preferences for email notifications, promotions, and
              newsletters.
            </p>
          </div>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Change Password</h4>
            <p className="mb-2">Securely update the account password.</p>
          </div>
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Delete Account</h4>
            <p className="mb-2">Option to deactivate or delete the account.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileOverview;
