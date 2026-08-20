    await waitFor(() => {
      expect(screen.getByTestId('settings-error')).toBeInTheDocument();
    });
  });
});