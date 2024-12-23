import React from 'react'
import ProtectedLayout from '../../layouts/protectedLayout';
function GrantHub() {
  return (
    <ProtectedLayout isPublic={false} classname="al b-app-settings">
      <div>GrantHub</div>
    </ProtectedLayout>
  )
}

export default GrantHub