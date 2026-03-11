#include <bits/stdc++.h>
using namespace std;
using ll = long long;

class Solution {
public:
    ll maxSequenceSum(vector<ll>& a) {
        return solve(a);
    }

private:
    ll solve(vector<ll>& arr) {
        if (arr.size() == 1) return arr[0];

        vector<ll> possibilities;
        
        possibilities.push_back(accumulate(arr.begin(), arr.end(), 0LL));

        vector<ll> reversed = arr;
        reverse(reversed.begin(), reversed.end());
        possibilities.push_back(solve(reversed));

        vector<ll> diff(arr.size() - 1);
        for (int i = 1; i < arr.size(); i++) {
            diff[i-1] = arr[i] - arr[i-1];
        }
        possibilities.push_back(solve(diff));

        return *max_element(possibilities.begin(), possibilities.end());
    }
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;

    Solution sol;
    while (t--) {
        int n;
        cin >> n;
        
        vector<ll> arr(n);
        for (int i = 0; i < n; i++) {
            cin >> arr[i];
        }

        cout << sol.maxSequenceSum(arr) << '\n';
    }

    return 0;
}