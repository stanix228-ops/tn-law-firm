import http.server
import os
import sys

PORT = 20000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def log_message(self, format, *args):
        with open(os.path.join(DIRECTORY, 'server_log.txt'), 'a', encoding='utf-8') as f:
            f.write(format % args + '\n')

if __name__ == '__main__':
    http.server.ThreadingHTTPServer.allow_reuse_address = True
    server = http.server.ThreadingHTTPServer(('', PORT), Handler)
    with open(os.path.join(DIRECTORY, 'server_log.txt'), 'a', encoding='utf-8') as f:
        f.write('SERVER_STARTED\n')
    server.serve_forever()
