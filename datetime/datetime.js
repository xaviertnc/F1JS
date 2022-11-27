/**
 * F1JS - Date - 06 Oct 2022
 *  
 * @author  C. Moller <xavier.tnc@gmail.com>
 * 
 * @version 3.0.0 - REL - 27 Nov 2022
 *   - Convert from static object to ES6 class!
 *
 */

export class DateTime {  

  constructor( days, months )
  {
    this.days = days || {
      long: [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ],
      short: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
    };
    this.months = months || {
      long: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
      short: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
    };
  }


  formatLong( date ) {
    // console.log('Date::formatLong(),', date );
    const yyyy = date.getFullYear(), m = date.getMonth(), d = date.getDate(), b = date.getDay(),
    dd = (d < 10) ? '0'+d : d, ddd = this.days.short[b], M = this.months.long[m];
    return `${ddd}, ${dd} ${M} ${yyyy}`;
  }


  formatYmd( date ) {
    console.log('Date::formatYmd(),', date );
    const yyyy = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate(),
    mm = m < 10 ? '0'+m : m, dd = d < 10 ? '0'+d : d;
    return `${yyyy}-${mm}-${dd}`;
  }


  parseLong( longDateStr ) {
    // console.log('Date::parseLong(), longDateStr =', longDateStr );
    if ( ! longDateStr ) return null;
    // NB: VARS (with `array.pop` assign) declaration order is crutial! 
    const parts = longDateStr.split(' '), months = this.months.long, year = parseInt(parts.pop());
    let month_term = parts.pop(), day = parseInt(parts.pop()) , month = months.indexOf( month_term );
    // console.log('Date::parseLong(), vals:', { parts, year, month_term, months, month, day });
    if ( month >= 0 ) return new Date( year, month, day );
    month_term = month_term.toLowerCase(); for ( let i=0; i < months.length; i++ ) { 
      if ( months[i].toLowerCase().includes(month_term) ) { month = i; break; } }
    return month >= 0 ? new Date( year, month, day ) : new Date();
  }


  parseYmd( sqlDateStr ) {
    // console.log('Date::parseYmd(), sqlDateStr =', sqlDateStr );
    return sqlDateStr ? new Date( sqlDateStr ) : null;
  }


  prevDayYmd( ymdStr ) {
    const oneDay = 24 * 60 * 60 * 1000;
    const curDate = this.parseYmd( ymdStr );
    const prevDay = new Date( curDate.getTime() - oneDay );
    // console.log('Date::prevDayYmd(), curDate =', curDate, ', prevDay =', prevDay );
    return this.formatYmd( prevDay );
  }


  nextDayYmd( ymdStr ) {
    const oneDay = 24 * 60 * 60 * 1000;
    const curDate = this.parseYmd( ymdStr );
    const nextDay = new Date( curDate.getTime() + oneDay );
    // console.log('Date::nextDayYmd(), curDate =', curDate, ', nextDay =', nextDay );
    return this.formatYmd( nextDay );
  }


  ymd2long( ymdStr ) {
    const date = this.parseYmd( ymdStr );
    return this.formatLong( date );
  }


  ymd2dmy( ymdStr ) {
    const dp = ymdStr.split('-');
    return dp[2] + '-' + dp[1] + '-' + dp[0];
  }

}
