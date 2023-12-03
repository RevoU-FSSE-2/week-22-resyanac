from enum import Enum

class Priority(Enum):
    LOW = 'low'
    MEDIUM = 'medium'
    HIGH = 'high'

class Progress(Enum):
    NOT_STARTED = 'not started'
    ON_PROGRESS = 'on progress'
    DONE = 'done'