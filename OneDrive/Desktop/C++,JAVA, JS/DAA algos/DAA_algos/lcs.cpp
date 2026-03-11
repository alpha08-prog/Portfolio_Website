#include <bits/stdc++.h>
using namespace std;

int LCS(string x, string y, vector<vector<int>>& table) {
    int n = x.size();
    int m = y.size();

    for (int i = 0; i <= n; i++) {
        for (int j = 0; j <= m; j++) {
            if (i == 0 || j == 0) {
                table[i][j] = 0; // Base case
            } else if (x[i - 1] == y[j - 1]) {
                table[i][j] = 1 + table[i - 1][j - 1];
            } else {
                table[i][j] = max(table[i - 1][j], table[i][j - 1]);
            }
        }
    }
    
    return table[n][m]; 
}


void findAllLCS(string x, string y, int i, int j, vector<vector<int>>& table, string lcs, set<string>& lcsSet) {
    if (i == 0 || j == 0) {
        lcsSet.insert(lcs); 
        return;
    }

    if (x[i - 1] == y[j - 1]) {
        
        lcs = x[i - 1] + lcs; // Prepend the character
        findAllLCS(x, y, i - 1, j - 1, table, lcs, lcsSet);
    } else {
       
        if (table[i - 1][j] >= table[i][j - 1]) {
            findAllLCS(x, y, i - 1, j, table, lcs, lcsSet); // Move up
        }
        if (table[i][j - 1] >= table[i - 1][j]) {
            findAllLCS(x, y, i, j - 1, table, lcs, lcsSet); // Move left
        }
    }
}

int main() {
    string x, y;
    cout << "Enter the strings x and y: " << endl;
    cin >> x >> y;

   
    vector<vector<int>> table(x.size() + 1, vector<int>(y.size() + 1, 0));

    int lcs_length = LCS(x, y, table);
    cout << "Length of LCS: " << lcs_length << endl; 

    
    set<string> lcsSet;

    findAllLCS(x, y, x.size(), y.size(), table, "", lcsSet);

    // Output all unique LCSs
    cout << "All LCSs:" << endl;
    for (const string& lcs : lcsSet) {
        cout << lcs << endl;
    }

    return 0;
}
