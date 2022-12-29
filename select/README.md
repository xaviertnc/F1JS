# F1JS Select - User Manual

## HTML
```
<div class="form-row">
  <div class="field required" data-type="Select">
    <label>Client</label>
    <select 
      name="client_id" 
      data-search="true" 
      data-prefix="select"
      data-multiple="false"
      data-value="0691234321"
      data-placeholder="- Select a client -"
      onchange="F1.onClientChanged(event)">
      <?php foreach( $cal->clients as $c ): $lbl = "{$c->name}<small> - {$c->cell}</small>"; ?>
      <option value="<?=$c->id?>" title="<?=$lbl?>"><?="{$c->name} - {$c->cell}"?></option>
      <?php endforeach; ?>
    </select>
  </div>
</div>
```

## Javascript
```
window.LOCALES = {
  en: {
    SEARCH             : 'Search...',
    NO_RESULT          : '- no result -',
    PLACEHOLDER_SINGLE : '- Select -',
    PLACEHOLDER_MULTI  : '- Select one or more -'
  },
  af: {
    SEARCH             : 'Soek...',
    NO_RESULT          : '- niks -',
    PLACEHOLDER_SINGLE : '- Kies -',
    PLACEHOLDER_MULTI  : '- Kies een of meer -'
  }
};

...

import { Select } from './js/vendors/f1js/select.js';

...

var elSelect = document.getElementById( 'client-select' );
var clientSelectCtrl = new Select( elSelect, { locale: window.LOCALES.af } );

...

// Before init: Add some code here...

clientSelectCtrl.init();

// After init: Add some code here...

...

F1.onClientChanged = function( event ) {
  console.log( 'The client select value changed!' );
  console.log( 'Old value:' event.details.oldValue );
  console.log( 'New value:' event.details.newValue );
  console.log( 'Selected options:' event.details.selected );
};
```