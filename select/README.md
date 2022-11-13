# F1JS Select - User Manual

	var select = new Select( HTMLSelectElement )

      <p class="field required" data-type="Select">
        <label>Client</label>
        <select 
          name="client_id" 
          data-locale="en" 
          data-search="true" 
          data-value="0691234321"
          data-placeholder="- Select a client -">
          <?php foreach( $cal->clients as $c ): $lbl = "{$c->name}<small> - {$c->cell}</small>"; ?>
          <option value="<?=$c->id?>" title="<?=$lbl?>"><?="{$c->name} - {$c->cell}"?></option>
          <?php endforeach; ?>
        </select>
      </p>	
