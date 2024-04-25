import React from 'react';

const Logout = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      const response = await fetch('/admin/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        onLogout();
      } else {
        console.error('Uloskirjautuminen epäonnistui');
      }
    } catch (error) {
      console.error('Virhe uloskirjautuessa:', error);
    }
  };

  return (
    <div className="logout-button-area">
      <button className="btn btn-danger" onClick={handleLogout}>
        Kirjaudu ulos
      </button>
    </div>
  );
};

export default Logout;
