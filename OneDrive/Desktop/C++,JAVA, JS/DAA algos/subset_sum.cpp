#include <iostream>
#include <vector>

bool isSubsetSum(const std::vector<int>& set, int target, std::vector<int>& subset) {
    int n = set.size();
    
    // DP table where dp[i][j] is true if a subset of the first i elements has sum j
    std::vector<std::vector<bool>> dp(n + 1, std::vector<bool>(target + 1, false));

    // Initialize: a sum of 0 is always possible with an empty subset
    for (int i = 0; i <= n; i++) {
        dp[i][0] = true;
    }

    // Fill the dp table
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= target; j++) {
            // If we do not include set[i-1]
            dp[i][j] = dp[i-1][j];

            // If we include set[i-1] and j is at least as large as set[i-1]
            if (j >= set[i-1]) {
                dp[i][j] = dp[i][j] || dp[i-1][j - set[i-1]];
            }
        }
    }

    // Check if there's a subset that adds up to target
    if (!dp[n][target]) {
        return false; // No subset found
    }

    // Backtrack to find the subset elements
    int sum = target;
    for (int i = n; i > 0 && sum > 0; i--) {
        // Check if the current element is part of the subset
        if (!dp[i-1][sum]) {
            subset.push_back(set[i-1]); // Include this element
            sum -= set[i-1]; // Reduce the target sum by this element's value
        }
    }

    return true;
}

int main() {
    int n, target;
    std::cout << "Enter the number of elements in the set: ";
    std::cin >> n;
    
    std::vector<int> set(n);
    std::cout << "Enter the elements of the set:\n";
    for (int i = 0; i < n; i++) {
        std::cin >> set[i];
    }
    
    std::cout << "Enter the target sum: ";
    std::cin >> target;
    
    std::vector<int> subset;
    if (isSubsetSum(set, target, subset)) {
        std::cout << "A subset with the given sum exists:\n";
        for (int num : subset) {
            std::cout << num << " ";
        }
        std::cout << std::endl;
    } else {
        std::cout << "No subset with the given sum exists.\n";
    }

    return 0;
}
