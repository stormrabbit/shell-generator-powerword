const buildStatelessComponentJs = (cmpntNm) => {
return `import React from 'react';
import styles from './${cmpntNm}.css';

function ${cmpntNm}() {
  return (
    <div className={styles.normal}>
      Hello, ${cmpntNm}
    </div>
  );
}

export default ${cmpntNm};
`;
}

const buildStatelessComponentCss = (cmpntNm) => {
return `.normal {
}
`
}

module.exports = {buildStatelessComponentCss, buildStatelessComponentJs};