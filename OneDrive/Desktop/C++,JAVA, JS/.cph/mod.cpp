#include <bits/stdc++.h>
using namespace std;
const int MOD = 998244353;

long long getBinaryString(int n) {
    long long result = 0;
    
    for (int i = 1; i <= n; i++) {
        string binary = bitset<32>(i).to_string();
        binary = binary.substr(binary.find('1'));  // Remove leading zeros

        // Process the binary string and apply modulo progressively
        for (char c : binary) {
            result = (result * 2 + (c - '0')) % MOD;
        }
    }
    
    return result;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        
        // Get the result for the given n
        long long result = getBinaryString(n);
        cout << result << '\n';
    }

    return 0;
}
