#include <bits/stdc++.h>
using namespace std;

void solve() {
    int N, K;
    cin >> N >> K;

    vector<int> array(N);  // Initialize vector with size N
    for (int i = 0; i < N; i++) {
        cin >> array[i];
    }

    int totalSub = (1 << N);  // Total subsets: 2^N
    for (int mask = 1; mask < totalSub; mask++) {
        int CurrAnd = -1;
        vector<int> subIndices;

        for (int i = 0; i < N; i++) {
            if (mask & (1 << i)) {  // Check if the i-th element is in the subset
                if (CurrAnd == -1) {
                    CurrAnd = array[i];
                } else {
                    CurrAnd &= array[i];
                }
                subIndices.push_back(i + 1);  // Store 1-based index
            }
        }

        if (CurrAnd == K) {  // Check if AND value matches K
            cout << "YES" << endl;
            cout << subIndices.size() << endl;
            for (int idx : subIndices) {
                cout << idx << " ";
            }
            cout << endl;
            return;
        }
    }

    cout << "NO" << endl;  // No valid subset found
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        solve();
    }
    return 0;
}
