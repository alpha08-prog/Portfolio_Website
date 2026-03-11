#include <iostream>
#include <vector>
#include <algorithm>
#include <limits.h>

const int N = 20; // Maximum number of cities
int dp[1 << N][N]; // DP table
int dist[N][N]; // Distance matrix
int n; // Number of cities

// TSP function using a visited vector instead of bit manipulation
int tsp(std::vector<int> &visited, int pos, int count) {
    if (count == n) { // All cities visited
        return dist[pos][0]; // Return to the starting city
    }

    // Convert the visited vector to a state index for memoization
    int state = 0;
    for (int i = 0; i < n; ++i) {
        if (visited[i]) {
            state |= (1 << i);
        }
    }

    // Memoization check
    if (dp[state][pos] != -1) {
        return dp[state][pos];
    }

    int ans = INT_MAX;
    for (int city = 0; city < n; city++) {
        if (!visited[city]) { // If city is not visited
            visited[city] = 1;
            int newAns = dist[pos][city] + tsp(visited, city, count + 1);
            ans = std::min(ans, newAns);
            visited[city] = 0; // Backtrack
        }
    }

    return dp[state][pos] = ans;
}

int main() {
    std::cout << "Enter number of cities: ";
    std::cin >> n;

    std::cout << "Enter distance matrix:\n";
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            std::cin >> dist[i][j];
        }
    }

    // Initialize dp array with -1 (not computed)
    for (int i = 0; i < (1 << N); i++) {
        for (int j = 0; j < N; j++) {
            dp[i][j] = -1;
        }
    }

    // Create a visited vector and start from the first city
    std::vector<int> visited(n, 0);
    visited[0] = 1; // Start with the first city as visited

    int result = tsp(visited, 0, 1);

    std::cout << "The minimum cost of visiting all cities is: " << result << std::endl;

    return 0;
}
