#include <iostream>
#include <vector>
using namespace std;

bool canConstructTree(int n, int d, int l) {
   
    if (l > n || d >= n) return false;
    if (n == 2) return (d == 1 && l == 2); 
    if (n < d + 1) return false;

   
    int maxLeaves = n - (d - 1);
    if (l > maxLeaves) return false;

    return true;
}

void constructTree(int n, int d, int l) {
    if (!canConstructTree(n, d, l)) {
        cout << -1 << '\n';
        return;
    }

    vector<pair<int, int>> edges;

   
    for (int i = 1; i < d; i++) {
        edges.push_back({i, i + 1});
    }

   
    int usedNodes = d; 
    int leafCount = 1;  

    while (usedNodes < n && leafCount < l) {
        usedNodes++;
        leafCount++;
        edges.push_back({1, usedNodes});  
    }

    
    while (usedNodes < n) {
        usedNodes++;
        edges.push_back({2, usedNodes});  
    }

  
    for (const auto& edge : edges) {
        cout << edge.first << " " << edge.second << '\n';
    }
}

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n, d, l;
        cin >> n >> d >> l;
        constructTree(n, d, l);
    }

    return 0;
}
