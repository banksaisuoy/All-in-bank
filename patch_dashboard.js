const fs = require('fs');

let dashboard = fs.readFileSync('src/components/Dashboard.jsx', 'utf8');

dashboard = dashboard.replace(
  "import { cn } from '../lib/utils';",
  "import { cn } from '../lib/utils';\nimport { RecentTransactions } from './RecentTransactions';"
);

dashboard = dashboard.replace(
  "        </div>\n\n      </div>",
  "        </div>\n\n        {/* Recent Transactions */}\n        <RecentTransactions />\n\n      </div>"
);

fs.writeFileSync('src/components/Dashboard.jsx', dashboard);
console.log('Dashboard updated');