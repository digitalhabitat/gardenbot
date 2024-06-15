FROM python:3.9.14 as base
#RUN apt update
#RUN apt install -y firefox-esr
#RUN pip install --upgrade pip && pip install lxml selenium markdown obsidianhtml-md-mermaid-fork python-frontmatter pygments regex requests beautifulsoup4 html5lib

RUN apt update
RUN apt install -y rsync
ENV VIRTUAL_ENV=/opt/venv
ENV OBS_HTML_USE_PIP_INSTALL true
RUN python -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
RUN pip install --upgrade pip && pip install .
#RUN python ci/tests/basic_regression_test.py

RUN chmod +x /workspaces/gardenbot/systems/wire-system/wireviz/wireviz.sh
RUN apt install -y graphviz
#RUN pip3 install wireviz
RUN git -b dev https://github.com/wireviz/WireViz.git
RUN cd ./WireViz
RUN pip3 install -e
RUN pip3 install -e
