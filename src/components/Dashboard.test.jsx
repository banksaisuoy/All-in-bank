     render(<App />);
     expect(screen.getByText('Welcome to All-in-bank')).toBeInTheDocument();
  });
});