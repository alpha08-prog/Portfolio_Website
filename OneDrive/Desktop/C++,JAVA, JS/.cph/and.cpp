#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

bool isValid(const vector<int>& arr, const vector<tuple<int, int, int>>& constraints) {
    for (const auto& [l, r, m] : constraints) {
        int minElement = *min_element(arr.begin() + l - 1, arr.begin() + r);
        if (minElement == m) {
            return false;
        }
    }
    return true;
}

vector<int> solveTestCase(int n, int k, const vector<tuple<int, int, int>>& constraints) {
    vector<int> arr(n, 1); // Initialize array with all elements as 1 (valid range is 1 to N)

    for (const auto& [l, r, m] : constraints) {
        bool satisfied = false;
        for (int i = l - 1; i < r; ++i) {
            if (arr[i] == m) {
                arr[i] = m + 1; // Adjust the element to avoid the condition
                if (arr[i] > n) {
                    arr[i] = m - 1; // Adjust downward if it exceeds bounds
                }
                satisfied = true;
                break;
            }
        }
        if (!satisfied) {
            // If we can't satisfy this constraint, return an invalid result
            return {-1};
        }
    }

    return isValid(arr, constraints) ? arr : vector<int>{-1};
}

int main() {
    int t;
    cin >> t;

    while (t--) {
        int n, k;
        cin >> n >> k;

        vector<tuple<int, int, int>> constraints(k);
        for (int i = 0; i < k; ++i) {
            int l, r, m;
            cin >> l >> r >> m;
            constraints[i] = {l, r, m};
        }

        vector<int> result = solveTestCase(n, k, constraints);
        if (result.size() == 1 && result[0] == -1) {
            cout << -1 << endl;
        } else {
            for (int val : result) {
                cout << val << " ";
            }
            cout << endl;
        }
    }

    return 0;
}
