#include <iostream>
#include <vector>
using namespace std;

const int MOD = 998244353;
const int MAX_Y = 4000006;  // Maximum possible Y (up to 4 * 10^6)

vector<long long> dp(MAX_Y, 0);

// Precompute the number of distinct configurations for each score
void precompute() {
    dp[0] = 1;  // One way to achieve score 0: do nothing

    // Iterate over all powers of 2: 2^1, 2^2, 2^3, ..., up to 2^x where 2^x <= MAX_Y
    for (int power = 2; power <= MAX_Y; power *= 2) {
        // Update dp array for all possible scores that can include this power of 2
        for (int score = MAX_Y - 1; score >= power; --score) {
            dp[score] = (dp[score] + dp[score - power]) % MOD;
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    int t;
    cin >> t;
    
    vector<int> queries(t);
    int max_query = 0;

    // Read the queries and find the maximum Y for efficient precomputation
    for (int i = 0; i < t; ++i) {
        cin >> queries[i];
        max_query = max(max_query, queries[i]);
    }
    
    // Precompute the DP table for all scores up to the maximum query value
    precompute();
    
    // Output the result for each query
    for (int i = 0; i < t; ++i) {
        cout << dp[queries[i]] << '\n';
    }
    
    return 0;
}
