# F1JS Menu - User Manual
 - Set the active menu item based on the current page.
 - Add event handlers for mobile and submenu toggles.
 - Add ARIA labels based on menu name and state.

## HTML
```
<div class="menu__wrapper flex reverse">
  <input id="menu-toggle" class="menu__toggle" type="checkbox">
  <label class="menu__toggleicon" for="menu-toggle"><i></i><i></i><i></i></label>
  <ul class="menu menu__mobile" aria-label="Main Menu">
    <li class="home"><a href=""><span>Home</span></a></li>
    <li><a href="bookings"><span>Bookings</span></a></li>
    <li class="submenu__wrapper admin-submenu">
      <a class="submenu__toggle"><span>Admin</span></a>
      <ul class="submenu" aria-label="Admin Submenu">
        <li><a href="clients"><span>Clients</span></a></li>
        <li><a href="therapists"><span>Therapists</span></a></li>
        <li><a href="treatments"><span>Treatments</span></a></li>
        <li><a href="stations"><span>Stations</span></a></li>
        <li><a href="settings"><span>Settings</span></a></li>
      </ul>
    </li>
    <li class="submenu__wrapper user-submenu">
      <a class="submenu__toggle"><span>User</span></a>
      <ul class="submenu" aria-label="User Submenu">
        <li><a href="profile"><span>Profile</span></a></li>
        <li><a href="logout"><span>Logout</span></a></li>
      </ul>
    </li>
  </ul>
</div>
```

## JS
```
document.addEventListener( 'DOMContentLoaded', function() {

  const menuCtrl = new Menu();
  menuCtrl.setActive( F1.pageUrl );
  menuCtrl.initSubmenus();

});
```