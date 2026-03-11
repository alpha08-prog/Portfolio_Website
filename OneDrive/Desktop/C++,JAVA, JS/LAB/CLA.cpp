#include<iostream>
#include<stdlib.h>
#include<cstdlib>
#include<vector>
#include<map>
#include<set>
#include<stack>
#include<queue>
#include<unordered_map>
using namespace std;

    int main(int argc, char *argv[]) {
    
    cout << "Number of arguments: " << argc << endl;

  
    if (argc < 3) {
        cout << "Usage: " << argv[0] << " <integer> <float>" << endl;
        return 1;
    }

    
    int intArg = atoi(argv[1]);      
    float floatArg = atof(argv[2]);  

    // Display the arguments and their types
    cout << "Integer argument: " << intArg << endl;
    cout << "Float argument: " << floatArg << endl;

    // Perform a simple operation
    float result = intArg + floatArg;
    cout << "Sum of " << intArg << " and " << floatArg << " is " << result << endl;
    return 0;
}
