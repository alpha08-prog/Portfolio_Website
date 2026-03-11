#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> profit;
    vector<int> weight;
    int max_weight, n;

    cout << "Enter the number of items and maximum weight: ";
    cin >> n >> max_weight;

    profit.resize(n);
    weight.resize(n);

    cout << "Enter the profit of items:" << endl;
    for (int i = 0; i < n; i++) { 
        cin >> profit[i];
    }
    
    cout << "Enter the weights of items:" << endl;
    for (int i = 0; i < n; i++) { 
        cin >> weight[i];
    }

    vector<vector<int>> knap(n + 1, vector<int>(max_weight + 1, 0));

    for (int i = 1; i <= n; i++) { 
        for (int w = 0; w <= max_weight; w++) {
            if (weight[i - 1] <= w) { 
                knap[i][w] = max(profit[i - 1] + knap[i - 1][w - weight[i - 1]], knap[i - 1][w]);
            } else {
                knap[i][w] = knap[i - 1][w];
            }
        }
    }

    cout << "Maximum profit: " << knap[n][max_weight] << endl; 

    return 0;
}
