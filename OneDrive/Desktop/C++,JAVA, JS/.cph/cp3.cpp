#include<bits/stdc++.h>

using namespace std;

int solve(vector<int>& nums, int k) {
    int n = nums.size();
    vector<int> dp(1 << n, -1);
    
    function<int(int)> calculate = [&](int mask) -> int {
        int bits = __builtin_popcount(mask);
        if (bits == n) return 0;
        if (dp[mask] != -1) return dp[mask];
        
        if (bits % 2 == 0) {
            int minScore = 1e9;
            for (int i = 0; i < n; i++) {
                if (!(mask & (1 << i))) {
                    int newMask = mask | (1 << i);
                    minScore = min(minScore, calculate(newMask));
                }
            }
            dp[mask] = minScore;
        } else {
            int maxScore = -1e9;
            int aliceNum = 0;
            for (int i = 0; i < n; i++) {
                if (mask & (1 << i)) {
                    if (__builtin_popcount(mask & ((1 << i) - 1)) % 2 == 0) {
                        aliceNum = nums[i];
                        break;
                    }
                }
            }
            
            for (int i = 0; i < n; i++) {
                if (!(mask & (1 << i))) {
                    int score = (aliceNum + nums[i] == k ? 1 : 0);
                    int newMask = mask | (1 << i);
                    maxScore = max(maxScore, score + calculate(newMask));
                }
            }
            dp[mask] = maxScore;
        }
        return dp[mask];
    };
    
    return calculate(0);
}

int main() {
    int t;
    cin >> t;
    
    while (t--) {
        int n, k;
        cin >> n >> k;
        
        vector<int> nums(n);
        for (int i = 0; i < n; i++) {
            cin >> nums[i];
        }
        
        cout << solve(nums, k) << endl;
    }
    
    return 0;
}