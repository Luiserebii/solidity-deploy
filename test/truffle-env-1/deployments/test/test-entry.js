const child_process = require('child_process');
const util = require('util'); 

const chai = require("chai");
const assert = chai.assert;

describe('Beginning running our .sh script...', () => {

  it('Execute deployment.sh', () => {
    const cmd = './deployment.sh';
    let res = child_process.spawnSync(cmd, [], { shell: true });
    assert.isNotOk(res.error, 'Error encountered: ' + util.inspect(res.error));
  });

});

