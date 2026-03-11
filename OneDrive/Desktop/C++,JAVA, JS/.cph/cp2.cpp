#include <bits/stdc++.h>
using namespace std;

bool canPlayAllCards(vector<vector<int>>& cards, vector<int>& order, int n, int m) {
    vector<int> indices(n);
    int last = -1;
    
    for(int round = 0; round < m; round++) {
        for(int i = 0; i < n; i++) {
            int player = order[i] - 1;
            if(indices[player] >= m || cards[player][indices[player]] <= last) {
                return false;
            }
            last = cards[player][indices[player]];
            indices[player]++;
        }
    }
    
    for(int i = 0; i < n; i++) {
        if(indices[i] != m) return false;
    }
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int t;
    cin >> t;
    
    while(t--) {
        int n, m;
        cin >> n >> m;
        
        vector<vector<int>> cards(n);
        for(int i = 0; i < n; i++) {
            cards[i].resize(m);
            for(int j = 0; j < m; j++) {
                cin >> cards[i][j];
            }
            sort(cards[i].begin(), cards[i].end());
        }
        
        vector<int> order(n);
        iota(order.begin(), order.end(), 1);
        
        bool found = false;
        do {
            if(canPlayAllCards(cards, order, n, m)) {
                found = true;
                for(int i = 0; i < n; i++) {
                    cout << order[i] << (i == n-1 ? '\n' : ' ');
                }
                break;
            }
        } while(next_permutation(order.begin(), order.end()));
        
        if(!found) cout << "-1\n";
    }
    return 0;
}