#include <iostream>
#include <vector>
#include <climits>

using namespace std;

int shortestPath(vector<vector<int>>& graph, int stages) {
    int n = graph.size();  
    vector<int> dp(n, INT_MAX);  
    dp[n - 1] = 0;  

    
    for (int i = n - 2; i >= 0; i--) {
        
        for (int j = i + 1; j < n; j++) {
            if (graph[i][j] != 0 && dp[j] != INT_MAX) {  
                dp[i] = min(dp[i], graph[i][j] + dp[j]);
            }
        }
    }
        return dp[0]; 
}

 

int main() {
    // Example graph with 8 vertices and 4 stages
    vector<vector<int>> graph = {
        {0, 1, 2, 5, 0, 0, 0, 0},
        {0, 0, 0, 0, 4, 11, 0, 0},
        {0, 0, 0, 0, 9, 5, 16, 0},
        {0, 0, 0, 0, 0, 0, 2, 6},
        {0, 0, 0, 0, 0, 0, 0, 0},
        {0, 0, 0, 0, 0, 0, 0, 2},
        {0, 0, 0, 0, 0, 0, 0, 5},
        {0, 0, 0, 0, 0, 0, 0, 0}
    };

    int stages = 4; 
    cout << "The shortest path cost is: " << shortestPath(graph, stages) << endl;

    return 0;
}
