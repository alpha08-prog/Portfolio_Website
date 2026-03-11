#include <bits/stdc++.h>
using namespace std;

int knapsack(int n, int p[], int w[], int m) {
    vector<pair<double, int>> ratio(n);  // Pair of <profit/weight ratio, index>
    int profit = 0;

    // Calculate profit-to-weight ratio and store with index
    for (int i = 0; i < n; i++) {
        ratio[i] = { (double)p[i] / w[i], i };
    }

    
    sort(ratio.rbegin(), ratio.rend());

    
    for (int i = 0; i < n; i++) {
        int idx = ratio[i].second;  

        if (m >= w[idx]) {
            
            m -= w[idx];
            profit += p[idx];
        } else {
            
            profit += p[idx] * ((double)m / w[idx]);
            break; 
        }
    }

    return profit;
}

int main() {
    int n;
    cout << "Enter the number of objects: " << endl;
    cin >> n;

    int profit[n], weight[n];
    
    cout << "Enter the profit of each object:" << endl;
    for (int i = 0; i < n; i++) {
        cin >> profit[i];
    }

    cout << "Enter the weight of each object:" << endl;
    for (int i = 0; i < n; i++) {
        cin >> weight[i];
    }

    int m;
    cout << "Enter the maximum capacity of the knapsack: " << endl;
    cin >> m;

    int ans = knapsack(n, profit, weight, m);
    cout << "Maximum profit: " << ans << endl;

    return 0;
}
