            </PrivateRoute>
          } 
        />
        {/* Placeholder for the transaction details page to avoid breaking tests/existing routing */}
        <Route path="/transactions/:id" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
};