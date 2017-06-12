import java.util.ArrayList;

public class Assignment6 {

	// A utility function to find maximum of two integers
	public static int max(int a, int b)
	{   return (a > b)? a : b; }

	/* Returns length of longest common substring of X[0..m-1]
	   and Y[0..n-1] */
	public static int LCSubStr(String X, String Y, int m, int n)
	{
	    // Create a table to store lengths of longest common suffixes of
	    // substrings.   Notethat LCSuff[i][j] contains length of longest
	    // common suffix of X[0..i-1] and Y[0..j-1]. The first row and
	    // first column entries have no logical meaning, they are used only
	    // for simplicity of program

		int[][] LCSuff = new int[m+1][n+1];

	    int result = 0;  // To store length of the longest common substring

	    /* Following steps build LCSuff[m+1][n+1] in bottom up fashion. */
	    for (int i=0; i<=m; i++)
	    {
	        for (int j=0; j<=n; j++)
	        {
	            if (i == 0 || j == 0)
	                LCSuff[i][j] = 0;

	            else if (X.charAt(i-1) == Y.charAt(j-1))
	            {
	                LCSuff[i][j] = LCSuff[i-1][j-1] + 1;
	                result = max(result, LCSuff[i][j]);
	            }
	            else LCSuff[i][j] = 0;
	        }
	    }
	    return result;
	}

	public static void main(String[] args) {
			String X = "OldSite:GeeksforGeeks.org";
		    String Y = "NewSite:GeekQui.com";


		    String A = "GEEKSFORGEEKS";
	    	ArrayList<String> Xlist = new ArrayList<String>();
	    	ArrayList<String> Ylist = new ArrayList<String>();




		    for(int i = 1; i < A.length()-1; i++){

		    	X = A.substring(0, i);
		    	Xlist.add(X);
			    System.out.println("  X= " + X + " " + 0 + "," + i );
		    }
		    System.out.println();

		    for(int j = A.length()-1; j >= 1; j--){

		    	X = A.substring(j, A.length());
		    	Ylist.add(X);

			    System.out.println("  Y= " + X + " " + j + "," + A.length() );
		    }

		    System.out.println(Xlist.size());
		    System.out.println(Ylist.size());


		    for(int i = 0; i < Xlist.size(); i++){
		    	for(int j = 0; j < Ylist.size(); j++){
		    		System.out.println("Largest subsequence: " + LCSubStr(Xlist.get(i), Ylist.get(j), Xlist.get(i).length(), Ylist.get(j).length() ) + " x= " + Xlist.get(i) + "   y= " + Ylist.get(i));
		    	}
		    }

		}


}
