const AIRTABLE_API_KEY="patrTllyb2WdjHNx3.c687a9fbcf885c4b62b9a3bce4f2f5c2e6784c6266419041dfb6d3a51245cc25";
var Airtable = require('airtable');
var base = new Airtable({apiKey: AIRTABLE_API_KEY}).base('appIQYAnCAABYkQtE');
export default base;